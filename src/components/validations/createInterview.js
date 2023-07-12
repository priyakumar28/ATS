import dayjs from "dayjs";
import * as yup from "yup";

export const schema =
  yup.object().shape({
    interviewRound: yup.string().required("Please select an option."),
    jobRecruiterId: yup.string().required("Please select an option."),
    interviewerId: yup
      .array()
      .min(0, "Please select at least one option.")
      .required("Interviewer is required."),
    startedAt: yup.date()
      .required('Start time is required')
      .typeError('Invalid start time'),
    endedAt: yup.date()
      .required('End time is required')
      .typeError('Invalid end time'),
    from: yup.date()
      .min(dayjs().startOf('day'), 'Date must be either the current date or a future date')
      .required('Date is required'),
    mode: yup.string().required("Please select an option."),

    location: yup.string(),

    feedback: yup.string(),
  });

export const interviewSchema = yup.object().shape({
  name: yup.string().trim().required("Interview Round Must not be empty").test('notANumber', 'Value must not be a number', value => isNaN(Number(value)))
    .typeError("Interview in a valid format"),
  description: yup.string().required("Description Must not be empty").trim().typeError("Interview in a valid format")
})
