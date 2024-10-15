import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  contactNumber: string;
}

interface AcademicDetails {
  academicAdvisor: string; 
  courseOfStudy: string;
  enrollmentYear: string;
  studentID: string;
  gpa: string;
}

interface EmergencyContact {
  contactPerson: string;
  relationship: string;
  emergencyNumber: string;
  address: string;
  contactMethod: string;
}

interface Documents {
  profilePicture: File | null;
  idCard: File | null;
  transcript: File | null;
  password: string;
  confirmPassword: string;
}

interface FormState {
  personalInfo: PersonalInfo;
  academicDetails: AcademicDetails;
  emergencyContact: EmergencyContact;
  documents: Documents;
}

const initialState: FormState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    contactNumber: '',
  },
  academicDetails: {
    academicAdvisor: '', 
    courseOfStudy: '',
    enrollmentYear: '',
    studentID: '',
    gpa: '',
  },
  emergencyContact: {
    contactPerson: '',
    relationship: '',
    emergencyNumber: '',
    address: '',
    contactMethod: '',
  },
  documents: {
    profilePicture: null,
    idCard: null,
    transcript: null,
    password: '',
    confirmPassword: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    updateAcademicDetails: (state, action: PayloadAction<AcademicDetails>) => {
      state.academicDetails = action.payload;
    },
    updateEmergencyContact: (state, action: PayloadAction<EmergencyContact>) => {
      state.emergencyContact = action.payload;
    },
    updateDocuments: (state, action: PayloadAction<Documents>) => {
      state.documents = action.payload;
    },
    resetForm: () => {
      return initialState; 
    },
  },
});

export const {
  updatePersonalInfo,
  updateAcademicDetails,
  updateEmergencyContact,
  updateDocuments,
  resetForm, 
} = formSlice.actions;

export default formSlice.reducer;
