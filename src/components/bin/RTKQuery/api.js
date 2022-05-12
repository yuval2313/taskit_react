import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

const apiEndpoint = "/tasks";

function taskUrl(taskId) {
  return `${apiEndpoint}/${taskId}`;
}

export function mapToBody(task) {
  const { title, content, status, priority, labels } = task;
  return {
    title,
    content,
    status,
    priority,
    labelIds: labels.map((label) => label._id),
  };
}

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery,
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => apiEndpoint,
    }),
    getTaskById: builder.query({
      query: (taskId) => taskUrl(taskId),
    }),

    addTask: builder.mutation({
      query: (task) => ({
        url: apiEndpoint,
        method: "POST",
        body: mapToBody(task),
      }),
    }),

    updateTask: builder.mutation({
      query: (task) => ({
        url: taskUrl(task._id),
        method: "PUT",
        body: mapToBody(task),
      }),
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({ url: taskUrl(taskId), method: "DELETE" }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
