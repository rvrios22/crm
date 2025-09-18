"use client";

import { Button, Form, Input } from "@heroui/react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState({
    comapnyName: "",
    companyEmail:
      typeof user?.primaryEmailAddress === "string"
        ? user.primaryEmailAddress
        : user?.primaryEmailAddress?.emailAddress || "",
    companyPhone: "",
  });
  const createCompany = useMutation(api.companies.mutations.createCompany);

  const handleCreateCompany = async () => {
    try {
      await createCompany({
        company_name: companyData.comapnyName,
        company_email: companyData.companyEmail,
        comapny_phone: companyData.companyPhone,
      });
      setCompanyData({ comapnyName: "", companyEmail: "", companyPhone: "" });
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <>
      <h1>Welcome, {user.firstName}!</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setIsloading(true);
          handleCreateCompany();
          setIsloading(false);
        }}
      >
        <Input
          value={companyData.comapnyName}
          onChange={(e) =>
            setCompanyData({ ...companyData, comapnyName: e.target.value })
          }
          placeholder="Enter your company name"
          isRequired
          label="Company Name"
          labelPlacement="outside"
          type="text"
        />
        <Input
          value={companyData.companyEmail}
          onChange={(e) =>
            setCompanyData({ ...companyData, companyEmail: e.target.value })
          }
          placeholder={
            typeof user.primaryEmailAddress === "string"
              ? user.primaryEmailAddress
              : user.primaryEmailAddress?.emailAddress ||
                "Enter your business email"
          }
          isRequired
          label="Company Email (if different than gmail)"
          labelPlacement="outside"
          type="text"
        />
        <Input
          value={companyData.companyPhone}
          onChange={(e) =>
            setCompanyData({ ...companyData, companyPhone: e.target.value })
          }
          placeholder="xxx-xxx-xxxx"
          label="Company Phone"
          labelPlacement="outside"
          type="text"
        />
        <Button type="submit" color="primary" isLoading={isLoading}>
          Create Company
        </Button>
      </Form>
    </>
  );
}
