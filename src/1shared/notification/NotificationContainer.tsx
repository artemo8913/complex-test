"use client";
import React from "react";
import { DefaultToastOptions, Toaster } from "react-hot-toast";

import Notification from "./Notification";

const TOAST_SHOW_DURATION_MS = 1000;

const TOASTER_OPTIONS: DefaultToastOptions = {
  duration: TOAST_SHOW_DURATION_MS,
};

export default function NotificationContainer() {
  return (
    <Toaster position="top-right" toastOptions={TOASTER_OPTIONS}>
      {(toast) => <Notification message={String(toast.message)} type={toast.type} icon={toast.icon} />}
    </Toaster>
  );
}
