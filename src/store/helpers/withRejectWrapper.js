export default function withRejectWrapper(callback) {
  return async (arg, thunkAPI) => {
    try {
      return await callback(arg);
    } catch (ex) {
      const { status, data } = ex.response;
      return thunkAPI.rejectWithValue({ status, data });
    }
  };
}
