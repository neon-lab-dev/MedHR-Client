import api from ".";
import axiosInstance from "./axiosInstance";

export const getAllEvents = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get(api.events, { withCredentials: true });
    return res.data ?? null;
  } catch (err: any) {
    throw err?.response?.message ?? "Something went wrong";
  }
};

export const getAllEmployerEvents = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get(api.getAllEventsForEmployer, {
      withCredentials: true,
    });
    return res.data ?? null;
  } catch (err: any) {
    throw err?.response?.message ?? "Something went wrong";
  }
};

export const getEventById = async (id: string): Promise<any> => {
  try {
    const res = await axiosInstance.get(`${api.getSingleEventById}/${id}`, {
      withCredentials: true,
    });
    return res.data ?? {};
  } catch (err: any) {
    throw err?.response?.data?.message ?? "Something went wrong";
  }
};

export const deleteEvent = async (id: string): Promise<string> => {
  try {
    await axiosInstance.delete(`${api.deleteEvent}/${id}`, {
      withCredentials: true,
    });
    return "Event deleted successfully";
  } catch (err: any) {
    throw err?.response?.message ?? "Failed to delete event";
  }
};
