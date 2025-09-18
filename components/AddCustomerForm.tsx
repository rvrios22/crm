import { Form, Button, Input } from "@heroui/react";
import { useState } from "react";

function AddCustomerForm() {
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [addressData, setAddressData] = useState({
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    zip: "",
  });
  return (
    <Form>
      <h2>Add A Customer</h2>
      <Input
        label="Name"
        labelPlacement="outside"
        type="text"
        placeholder="Full Name"
        value={customerData.name}
        onChange={(e) =>
          setCustomerData({ ...customerData, name: e.target.value })
        }
      />
      <Input
        label="Email"
        labelPlacement="outside"
        type="text"
        placeholder="example@test.com"
        value={customerData.email}
        onChange={(e) =>
          setCustomerData({ ...customerData, email: e.target.value })
        }
      />
      <Input
        label="Phone Number"
        labelPlacement="outside"
        type="text"
        placeholder="xxx-xxx-xxxx"
        value={customerData.phone}
        onChange={(e) =>
          setCustomerData({ ...customerData, phone: e.target.value })
        }
      />
      <Input
        label="Street Address"
        labelPlacement="outside"
        type="text"
        placeholder="123 Main St"
        value={addressData.streetAddress1}
        onChange={(e) =>
          setAddressData({ ...addressData, streetAddress1: e.target.value })
        }
      />
      <Input
        label="Street Address 2"
        labelPlacement="outside"
        type="text"
        placeholder="Apt 101"
        value={addressData.streetAddress2}
        onChange={(e) =>
          setAddressData({ ...addressData, streetAddress2: e.target.value })
        }
      />
      <Input
        label="City"
        labelPlacement="outside"
        type="text"
        placeholder="San Diego"
        value={addressData.city}
        onChange={(e) =>
          setAddressData({ ...addressData, city: e.target.value })
        }
      />
      <Input
        label="State"
        labelPlacement="outside"
        type="text"
        placeholder="CA"
        value={addressData.state}
        onChange={(e) =>
          setAddressData({ ...addressData, state: e.target.value })
        }
      />
      <Input
        label="Zip"
        labelPlacement="outside"
        type="text"
        placeholder="92027"
        value={addressData.zip}
        onChange={(e) =>
          setAddressData({ ...addressData, zip: e.target.value })
        }
      />
      <Button color="primary" type="submit">
        Create Customer
      </Button>
    </Form>
  );
}

export default AddCustomerForm;
