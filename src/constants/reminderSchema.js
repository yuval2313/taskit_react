import Joi from "joi";
import units from "constants/timeIntervalUnits";

const schema = Joi.object({
  value: Joi.number().custom((v, helper) => {
    const { unitValue } = helper.state.ancestors[0];

    if (unitValue === units[0].value) {
      if (v < 1 || v > 40320)
        return helper.message("Value must be between 1 and 40320 minutes");
      else return true;
    }
    if (unitValue === units[1].value) {
      if (v < 1 || v > 672)
        return helper.message("Value must be between 1 and 672 hours");
      else return true;
    }
    if (unitValue === units[2].value) {
      if (v < 1 || v > 28)
        return helper.message("Value must be between 1 and 28 days");
      else return true;
    }
    if (unitValue === units[3].value) {
      if (v < 1 || v > 4)
        return helper.message("Value must be between 1 and 4 weeks");
      else return true;
    }
  }),
  unitValue: Joi.number().valid(...units.map((u) => u.value)),
});

export default schema;
