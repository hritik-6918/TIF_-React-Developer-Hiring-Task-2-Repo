import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import * as Yup from "yup";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  setinterviewSettings: (n: any) => void;
}> = ({ handleTab,setinterviewSettings }) => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("interviewMode is required"),
      interviewDuration: Yup.string().required("interviewDuration is required"),
      interviewLanguage: Yup.string().required("interviewLanguage is required"),
    }),
    onSubmit: (values) => {
      if (isValid) { 
        console.log({ values });
        alert("Form successfully submitted");
      }
    },
  });

    const isChange = (e:string, v:any) => {
    const name = e;
    const value = v;
    setinterviewSettings((values:any) => ({...values, [name]: value}))
  }

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(e:string,v:any) => { setFieldValue(e,v); isChange(e,v); }}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(e:string,v:any) => { setFieldValue(e,v); isChange(e,v); }}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(e:string,v:any) => { setFieldValue(e,v); isChange(e,v); }}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
