import { Schema, model } from 'mongoose';
import { Gourdian, LocalGuardian, Student, UserName } from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [10, "name cannot be more than 30 characters"], // Corrected maxlength value
        validate: {
            validator: function(value) {
                const firstNamestr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNamestr === value;
            },
            message: props => `${props.value} is not capitalized`
        }
    },
        middleName : {
            type: String, 
            trim: true,
            maxlength: [10, "name cannot be more than 30 character"]
        },
        lastName : {
            type: String, 
            required : true,
            trim: true,
            maxlength: [10, "name cannot be more than 30 character"],
            validate: {
                validator: (value: string)=>validator.isAlpha(value)
            },
            message: '{VALUE} is not capitalized'
        }
})


const guardianSchema = new Schema<Gourdian>({
        fatherName: {type: String, required: true},
        fatherOccupation: {type: String, required: true},
        fatherContactNumber: {type: String, required: true},
        motherName: {type: String, required: true},
        motherOccupation: {type: String, required: true},
        motherContactNumber: {type: String, required: true},
})


const localGuardianSchema = new Schema<LocalGuardian>({
        name: {type: String, required: true},
        occupation: {type: String, required: true},
        contactNo: {type: String, required: true},
        address: {type: String, required: true},
})



const studentSchema = new Schema<Student>({
    id: { type: String, required: true, unique: true},
    name: {
        type: userNameSchema,
        required: [true, "Name is required"],
    },
    gender : {
        type: String,
        enum: {
            values:  ["male" , "female", "others"],
            message: '{VALUE} is not valid'
        },
        required: true
    },
    dateOfBirth : {
        type : String
    },
    email : {
        type : String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string)=> validator.isEmail(value)
        },
       message: '{VALUE} is not capitalized'
    },
    contactNo : {
        type: String, 
        required: true,
    },
    emergencyContactNumber : {
        type: String, 
        required: true,
    },
    bloodGroup : {
        type: String,
        enum:  ["A+" , "A-", "Ab+", "O+", "O-"]
    },
    presentAddress :  {
        type: String, 
        required: true,
    },
    permanentAddress :  {
        type: String, 
        required: true,
    },
    guardian : {
        type: guardianSchema,
        required: true
    },
    localGuardian : {
        type: localGuardianSchema,
        required: true
    },
    profileImg : {
        type : String,
    },
    isActive :{
        type: String,
        enum:  ["active", "blocked"],
        default: "active"
    }

  });


  export const StudentModel = model<Student>('Student', studentSchema)