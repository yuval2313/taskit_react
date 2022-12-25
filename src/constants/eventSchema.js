import Joi from "joi";

const schema = Joi.object({
  start: Joi.date()
    .custom((date, helper) => {
      if (date < new Date().setSeconds(0, 0))
        return helper.message("Choose a future start time");
      else return date;
    })
    .required(),
  end: Joi.date()
    .custom((date, helper) => {
      const { start } = helper.state.ancestors[0];
      if (date < new Date(start).getTime() + 300000)
        return helper.message(
          "End time should be greater than start time by at least 5 minutes"
        );
      else return true;
    })
    .required(),
  reminders: Joi.array().items(Joi.number().max(40320)).max(5),
});

export default schema;
