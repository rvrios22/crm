"use client";

import { Button, Form, Input, addToast } from "@heroui/react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState({
    comapnyName: "",
    companyEmail: "",
    companyPhone: "",
  });
  const router = useRouter();

  const createCompany = useMutation(api.companies.mutations.createCompany);
  const updateUser = useMutation(api.users.mutations.updateUser);

  const convexUserByClerkId = useQuery(api.users.queries.getUserByClerkId, {
    clerk_id: user?.id || "",
  });
  
  const addCompanyIdToUser = async (companyId: string) => {
    try {
      if (!convexUserByClerkId?._id) {
        throw new Error("User ID is undefined");
      }
      await updateUser({ id: convexUserByClerkId._id, company_id: companyId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCompany = async () => {
    try {
      const companyId = await createCompany({
        company_name: companyData.comapnyName,
        company_email:
          companyData.companyEmail ||
          (typeof user?.primaryEmailAddress === "string"
            ? user.primaryEmailAddress
            : user?.primaryEmailAddress?.emailAddress || ""),
        comapny_phone: companyData.companyPhone,
      });
      await addCompanyIdToUser(companyId)
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
          router.push("/schedule");
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
