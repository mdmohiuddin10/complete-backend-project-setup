export type Gourdian = {
        fatherName: string;
        fatherOccupation : string;
        fatherContactNumber : string;
        motherName: string;
        motherOccupation : string;
        motherContactNumber : string;
    }

export type UserName = {
        firstName: string;
        middleName: string;
        lastName: string 
    }

export type LocalGuardian = {
    name : string;
    occupation : string;
    contactNo : string;
    address : string
}
    

export type Student =  {
    id: string,
    name: UserName;
    gender: "male" | "female";
    email: string;
    dateOfBirth : string;
    contactNo : string;
    emergencyContactNumber : string;
    bloodGroup ?: "A+" | "A-" | "Ab+" | "O+" | "O-";
    presentAddress : string;
    permanentAddress : string;
    guardian : Gourdian;
    localGuardian : LocalGuardian;
    profileImg ?: string;
    isActive : "active" | "blocked"

  }