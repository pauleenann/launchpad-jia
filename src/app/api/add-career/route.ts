import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongoDB/mongoDB";
import { guid } from "@/lib/Utils";
import sanitizeHtml from 'sanitize-html';
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const {
      jobTitle,
      description,
      lastEditedBy,
      createdBy,
      screeningSetting,
      cvSecretPrompt,
      preScreeningQuestions,
      aiScreeningSetting,
      interviewQuestions,
      orgID,
      requireVideo,
      location,
      workSetup,
      workSetupRemarks,
      status,
      salaryNegotiable,
      minimumSalary,
      maximumSalary,
      country,
      province,
      employmentType,
    } = await request.json();

    //sanitize fields
    const sanitizedJobTitle = sanitizeHtml(jobTitle, { allowedTags: [] });
    const sanitizedDescription = sanitizeHtml(description);
    const sanitizedCvSecretPrompt = sanitizeHtml(cvSecretPrompt, { allowedTags: [] });

    // Validate required fields
    if (!sanitizedJobTitle || !sanitizedDescription) {
      return NextResponse.json(
        {
          error:
            "Make sure Job Title, and Description are valid inputs.",
        },
        { status: 400 }
      );
    }

    const { db } = await connectMongoDB();

    // const orgDetails = await db.collection("organizations").aggregate([
    //   {
    //     $match: {
    //       _id: new ObjectId(orgID)
    //     }
    //   },
    //   {
    //     $lookup: {
    //         from: "organization-plans",
    //         let: { planId: "$planId" },
    //         pipeline: [
    //             {
    //                 $addFields: {
    //                     _id: { $toString: "$_id" }
    //                 }
    //             },
    //             {
    //                 $match: {
    //                     $expr: { $eq: ["$_id", "$$planId"] }
    //                 }
    //             }
    //         ],
    //         as: "plan"
    //     }
    //   },
    //   {
    //     $unwind: "$plan"
    //   },
    // ]).toArray();

    // if (!orgDetails || orgDetails.length === 0) {
    //   return NextResponse.json(
    //     { error: "Organization not found" }, 
    //     { status: 404 }
    //   );
    // }

    // const totalActiveCareers = await db.collection("careers").countDocuments({ orgID, status: "active" });

    // if (totalActiveCareers >= (orgDetails[0].plan.jobLimit + (orgDetails[0].extraJobSlots || 0))) {
    //   return NextResponse.json({ 
    //     error: "You have reached the maximum number of jobs for your plan" }, 
    //     { status: 400 }
    //   );
    // }

    const career = {
      id: guid(),
      jobTitle: sanitizedJobTitle,
      description: sanitizedDescription,
      cvSecretPrompt: sanitizedCvSecretPrompt,
      preScreeningQuestions,
      aiScreeningSetting,
      interviewQuestions,
      location,
      workSetup,
      workSetupRemarks,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastEditedBy,
      createdBy,
      status: status || "active",
      screeningSetting,
      orgID,
      requireVideo,
      lastActivityAt: new Date(),
      salaryNegotiable,
      minimumSalary,
      maximumSalary,
      country,
      province,
      employmentType,
    };

    console.log('career', career)

    await db.collection("careers").insertOne(career);

    return NextResponse.json({
      message: "Career added successfully",
      career,
    });
  } catch (error) {
    console.error("Error adding career:", error);
    return NextResponse.json(
      { error: "Failed to add career" },
      { status: 500 }
    );
  }
}
