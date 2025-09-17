"use client";

import { Button, Form, Input } from "@heroui/react";

export default function Page() {
  return (
    <>
      <h1>Welcome!</h1>
      <Form>
        <Input
          isRequired
          label="Company Name"
          labelPlacement="outside"
          value={""}
          type="text"
        />
        <Input
          isRequired
          label="Company Email (if differnt than gmail)"
          labelPlacement="outside"
          value={""}
          type="text"
        />
        <Input
          label="Company Phone"
          labelPlacement="outside"
          value={""}
          type="text"
        />
        <Button color="primary">Create Company</Button>
      </Form>
    </>
  );
}
