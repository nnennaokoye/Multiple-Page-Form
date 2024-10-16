import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Heading,
  InputGroup,
  Stack,
  InputLeftAddon,
  Select,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  Progress,
  StepNumber,
  StepDescription,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateDocuments, resetForm as resetFormAction } from '../store/formslice';

const validationSchemas = [
  Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string()
    .length(11, 'Invalid number')
    .required('Contact number is required'),
  }),
  Yup.object({
    courseOfStudy: Yup.string().required('Course of study is required'),
    enrollmentYear: Yup.string().required('Enrollment year is required'),
    studentID: Yup.string().length(9, 'Invalid Student ID').matches(/^\d{9}$/, 'Invalid Student ID').required('Student ID is required'),
    gpa: Yup.number().typeError('Invalid GPA').required('GPA is required').min(0, 'Invalid GPA').max(5, 'Invalid GPA'),
    academicAdvisor: Yup.string().required('Academic advisor name is required'),
  }),
  Yup.object({
    contactPerson: Yup.string().required('Contact person is required'),
    relationship: Yup.string().required('Relationship is required'),
    emergencyNumber: Yup.string()
    .length(11, 'Invalid number')
    .required('Emergency number is required'),
    address: Yup.string().required('Address is required'),
    contactMethod: Yup.string().required('Contact method is required'),
  }),
  Yup.object({
    profilePicture: Yup.mixed().test('fileRequired', 'Profile picture is required', value => value instanceof File),
    idCard: Yup.mixed().test('fileRequired', 'ID card is required', value => value instanceof File),
    transcript: Yup.mixed().test('fileRequired', 'Transcript is required', value => value instanceof File),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
  }),
];

const steps = [
  { title: 'Step 1', description: 'Personal Information' },
  { title: 'Step 2', description: 'Academic Details' },
  { title: 'Step 3', description: 'Emergency Contact' },
  { title: 'Step 4', description: 'Documents' },
];

const SchoolForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = (values: any, resetForm: () => void) => {
    if (currentStep < validationSchemas.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      dispatch(updateDocuments(values));
      setModalOpen(true);
      resetForm();
      dispatch(resetFormAction());
    }
  };

  const maxSteps = steps.length - 1;
  const progressPercent = (currentStep / maxSteps) * 100;

  return (
    <>
      <Flex justify="center" align="center" minHeight="100px" ml="420px" mt="40px" mb="40px" boxShadow='md'>
        <Box p={6} maxW="500px" width="500px" mx="auto" mt={10}>
          <Heading as="h3" size="xl" textAlign="center" mb={4} color="#0047AB">
            School Form
          </Heading>

          {/* Stepper */}
          <Box position="relative" mb={4}>
  <Stepper size="sm" index={currentStep} colorScheme="blue" gap="0">
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        <Step
          flexDirection="column"
          alignItems="center"
          height="80px"
          gap={2}
        >
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box flexShrink="0" textAlign="center">
            <StepDescription fontSize="xs">
              {step.description}
            </StepDescription>
          </Box>
        </Step>
        {index < steps.length - 1 && (
          <Box width="40px" height="2px" bg="gray.500" alignSelf="center" />
        )}
      </React.Fragment>
    ))}
  </Stepper>
  <Progress
    value={progressPercent}
    position="absolute"
    height="3px"
    width="full"
    top="12px"
    zIndex={-1}
    colorScheme="blue"
  />
</Box>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              gender: '',
              email: '',
              contactNumber: '',
              courseOfStudy: '',
              enrollmentYear: '',
              studentID: '',
              gpa: '',
              academicAdvisor: '',
              contactPerson: '',
              relationship: '',
              emergencyNumber: '',
              address: '',
              contactMethod: '',
              profilePicture: null,
              idCard: null,
              transcript: null,
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchemas[currentStep]}
            validateOnChange={true} // Disable validation on change
            validateOnBlur={false}   // Disable validation on blur
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form>
                {currentStep === 0 && (
                  <>
                     <FormControl isInvalid={touched.firstName && !!errors.firstName}>
                      <FormLabel color="#0047AB">First Name</FormLabel>
                      <Field name="firstName" as={Input} placeholder="John" />
                      <Box color="red">{touched.firstName && errors.firstName}</Box>
                    </FormControl>

                    <FormControl mt={4} isInvalid={touched.lastName && !!errors.lastName}>
                      <FormLabel color="#0047AB">Last Name</FormLabel>
                      <Field name="lastName" as={Input} placeholder="Doe" />
                      <Box color="red">{touched.lastName && errors.lastName}</Box>
                    </FormControl>

                    <FormControl mt={4} isInvalid={touched.gender && !!errors.gender}>
                      <FormLabel color="#0047AB">Gender</FormLabel>
                      <Field name="gender" as={Select}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                      <Box color="red">{touched.gender && errors.gender}</Box>
                    </FormControl>

                    <FormControl mt={4} isInvalid={touched.email && !!errors.email}>
                      <FormLabel color="#0047AB">Email Address</FormLabel>
                      <Field name="email" as={Input} placeholder="John@gmail.com" />
                      <Box color="red">{touched.email && errors.email}</Box>
                    </FormControl>

                    <FormControl mt={4} isInvalid={touched.contactNumber && !!errors.contactNumber}>
                      <FormLabel color="#0047AB">Contact Number</FormLabel>
                      <Stack>
                        <InputGroup>
                          <InputLeftAddon children="+234" />
                          <Field name="contactNumber" as={Input} placeholder="8123456789" />
                        </InputGroup>
                      </Stack>
                      <Box color="red">{touched.contactNumber && errors.contactNumber}</Box>
                    </FormControl>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <FormControl isInvalid={touched.courseOfStudy && !!errors.courseOfStudy}>
                <FormLabel color="#0047AB">Course of Study</FormLabel>
                <Field name="courseOfStudy" as={Select} >
                  <option style={{ color: '#0047AB' }} value="">Select Course of Study</option>
                  <option style={{ color: '#0047AB' }} value="Computer Science">Computer Science</option>
                  <option style={{ color: '#0047AB' }} value="Information Technology">Information Technology</option>
                  <option style={{ color: '#0047AB' }} value="Software Engineering">Software Engineering</option>
                  <option style={{ color: '#0047AB' }} value="Business Administration">Business Administration</option>
                </Field>
                <Box color="red">{touched.courseOfStudy && errors.courseOfStudy}</Box>
              </FormControl>

              <FormControl isInvalid={touched.enrollmentYear && !!errors.enrollmentYear}>
                <FormLabel color="#0047AB">Enrollment Year</FormLabel>
                <Field name="enrollmentYear" as={Input} placeholder="2023"  />
                <Box color="red">{touched.enrollmentYear && errors.enrollmentYear}</Box>
              </FormControl>

              <FormControl isInvalid={touched.studentID && !!errors.studentID}>
  <FormLabel color="#0047AB">Student ID</FormLabel>
  <Field
    name="studentID"
    as={Input}
    type="text" 
    placeholder="123456789"
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFieldValue("studentID", value); 
    }}
  />
  <Box color="red">{touched.studentID && errors.studentID}</Box>
</FormControl>

              <FormControl isInvalid={touched.gpa && !!errors.gpa}>
                <FormLabel color="#0047AB">GPA</FormLabel>
                <Field
                  name="gpa"
                  as={Input}
                  type="number"
                  placeholder="4.5"
                  _placeholder={{ color: '#0047AB' }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value === '' ? '' : parseFloat(e.target.value);
                    setFieldValue("gpa", value);
                  }}
                />
                <Box color="red">{touched.gpa && errors.gpa}</Box>
              </FormControl>

              <FormControl isInvalid={touched.academicAdvisor && !!errors.academicAdvisor}>
                <FormLabel color="#0047AB">Academic Advisor Name</FormLabel>
                <Field name="academicAdvisor" as={Input} placeholder="Dr John Smith" _placeholder={{ color: '#0047AB' }} />
                <Box color="red">{touched.academicAdvisor && errors.academicAdvisor}</Box>
              </FormControl>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <FormControl isInvalid={touched.contactPerson && !!errors.contactPerson}>
                      <FormLabel color="#0047AB">Contact Person</FormLabel>
                      <Field name="contactPerson" as={Input} placeholder="Jane Doe" />
                      <Box color="red">{touched.contactPerson && errors.contactPerson}</Box>
                    </FormControl>

                    <FormControl isInvalid={touched.relationship && !!errors.relationship}>
                      <FormLabel color="#0047AB">Relationship</FormLabel>
                      <Field name="relationship" as={Input} placeholder="Mother" />
                      <Box color="red">{touched.relationship && errors.relationship}</Box>
                    </FormControl>

                    <FormControl isInvalid={touched.emergencyNumber && !!errors.emergencyNumber}>
                      <FormLabel color="#0047AB">Emergency Number</FormLabel>
                      <Stack>
                        <InputGroup>
                          <InputLeftAddon children="+234" />
                          <Field name="emergencyNumber" as={Input} placeholder="8123456789" />
                        </InputGroup>
                      </Stack>
                      <Box color="red">{touched.emergencyNumber && errors.emergencyNumber}</Box>
                    </FormControl>

                    <FormControl isInvalid={touched.address && !!errors.address}>
                      <FormLabel color="#0047AB">Address</FormLabel>
                      <Field name="address" as={Input} placeholder="123 Main Street" />
                      <Box color="red">{touched.address && errors.address}</Box>
                    </FormControl>

                    <FormControl isInvalid={touched.contactMethod && !!errors.contactMethod}>
                      <FormLabel color="#0047AB">Preferred Contact Method</FormLabel>
                      <Field name="contactMethod" as={Select}>
                        <option value="">Select Contact Method</option>
                        <option value="Phone">Phone</option>
                        <option value="Email">Email</option>
                        <option value="SMS">SMS</option>
                      </Field>
                      <Box color="red">{touched.contactMethod && errors.contactMethod}</Box>
                    </FormControl>
                  </>
                )}

                {currentStep === 3 && (
                  <>
<FormControl isInvalid={touched.profilePicture && !!errors.profilePicture}>
  <FormLabel color="#0047AB">Profile Picture</FormLabel>
  <Input
    type="file"
    accept="image/*"
    onChange={(event) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        setFieldValue('profilePicture', file);
      }
    }}
  />
  <Box color="red">{touched.profilePicture && errors.profilePicture}</Box>
</FormControl>

<FormControl isInvalid={touched.idCard && !!errors.idCard}>
  <FormLabel color="#0047AB">ID Card</FormLabel>
  <Input
    type="file"
    accept="image/*"
    onChange={(event) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        setFieldValue('idCard', file);
      }
    }}
  />
  <Box color="red">{touched.idCard && errors.idCard}</Box>
</FormControl>

<FormControl isInvalid={touched.transcript && !!errors.transcript}>
  <FormLabel color="#0047AB">Transcript</FormLabel>
  <Input
    type="file"
    accept="application/pdf"
    onChange={(event) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        setFieldValue('transcript', file);
      }
    }}
  />
  <Box color="red">{touched.transcript && errors.transcript}</Box>
</FormControl>

                    <FormControl isInvalid={touched.password && !!errors.password}>
                      <FormLabel color="#0047AB">Password</FormLabel>
                      <Field name="password" as={Input} type="password" placeholder="Password" />
                      <Box color="red">{touched.password && errors.password}</Box>
                    </FormControl>

                    <FormControl isInvalid={touched.confirmPassword && !!errors.confirmPassword}>
                      <FormLabel color="#0047AB">Confirm Password</FormLabel>
                      <Field name="confirmPassword" as={Input} type="password" placeholder="Confirm Password" />
                      <Box color="red">{touched.confirmPassword && errors.confirmPassword}</Box>
                    </FormControl>
                  </>
                )}

                {/* Buttons */}
                <Flex mt={6} justify="space-between">
  {currentStep > 0 && (
    <Button
      mt={6}
      color="white"
      bg="#0047AB"
      size="lg"
      width="150px"
      height="50px"
      border="none"
      sx={{
        _hover: { bg: '#0047AB' },
      }}
      onClick={() => setCurrentStep((prev) => prev - 1)}
    >
      Previous
    </Button>
  )}

  <Button
    type="submit" 
    background="#0047AB"
    mt={6}
    color="white"
    bg="#0047AB"
    size="lg"
    width="150px"
    height="50px"
    border="none"
    sx={{
      _hover: { bg: '#0047AB' },
    }}
  >
    {currentStep === maxSteps ? 'Submit' : 'Next'}
  </Button>
</Flex>

              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody textAlign="center" py={10}>
            Form submitted successfully!
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={() => setModalOpen(false)}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SchoolForm;