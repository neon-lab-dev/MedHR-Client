"use client";
import React from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const LoginModal = () => {
  const {
  } = useForm<IFormInput>();
  // const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <dialog id="admin_login_modal" className="modal">
    
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default LoginModal;
