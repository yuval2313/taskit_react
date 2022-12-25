import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchTasks } from "store/entities/tasks";

function usePopulateTasks(onSelectTask) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id: paramTaskId } = useParams();

  async function populateTasks() {
    try {
      const tasks = await dispatch(fetchTasks()).unwrap();
      const task = tasks.find((t) => t._id === paramTaskId);

      if (task) {
        onSelectTask(paramTaskId);
      } else if (paramTaskId) navigate("/not-found");
    } catch (ex) {
      const { status } = ex;
      if (status === 404 && paramTaskId) navigate("/not-found");
    }
  }

  useEffect(() => {
    populateTasks();
  }, []);
}

export { usePopulateTasks };
