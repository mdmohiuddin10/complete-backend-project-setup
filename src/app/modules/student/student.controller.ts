import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import  Joi from 'joi';


const createStudent = async(req: Request, res: Response) =>{

   try{

    // creating a shema validation using JOi
    const userNameSchema = Joi.string(); // Define this according to your specific requirements
    const guardianSchema = Joi.object(); // Define this according to your specific requirements
    const localGuardianSchema = Joi.object(); // Define this according to your specific requirements
    
    const studentSchema = Joi.object({
        id: Joi.string().required(),
        name: userNameSchema.required(),
        gender: Joi.string().valid('male', 'female', 'others').required(),
        dateOfBirth: Joi.string(),
        email: Joi.string().email().required(),
        contactNo: Joi.string().required(),
        emergencyContactNumber: Joi.string().required(),
        bloodGroup: Joi.string().valid('A+', 'A-', 'Ab+', 'O+', 'O-'),
        presentAddress: Joi.string().required(),
        permanentAddress: Joi.string().required(),
        guardian: guardianSchema.required(),
        localGuardian: localGuardianSchema.required(),
        profileImg: Joi.string(),
        isActive: Joi.string().valid('active', 'blocked').default('active')
    });
    
    const {student: studentData} = req.body;
    const {error, value} = studentSchema.validate(studentData)
   
    if(error){
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error: error.details
        })
    }


    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    // send response
    res.status(200).json({
        success : true,
        message : "Student is created successfully",
        data : result,
    })
   }
   catch(err){
    res.status(500).json({
        success : false,
        message : "Something went wrong",
        error : err,
    })
   }
}

const getAllStudents = async(req:Request, res:Response) =>{
    try{
        const result = await StudentServices.getAllStudentsFromDB()
        res.status(200).json({
            success : true,
            message : "Students are retrive successfully",
            data : result,
        })
    }
    catch(err){
        console.log(err);
    }
}


const getSingleStudent = async(req:Request, res:Response) =>{
    try{

        const { studentId } = req.params
        const studentResult = await StudentServices.getSingleStudentFromDB(studentId);

        res.status(200).json({
            success : true,
            message : "Student is  retrive successfully",
            data : studentResult,
        })
    }
    catch(err){
        console.log(err);
    }
}


export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
}