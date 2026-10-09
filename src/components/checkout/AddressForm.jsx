"use client";
import { useState, useEffect } from "react";
import { addAddress, updateAddress } from "services/api/address";
import InputField from "./InputField";
import SelectField from "./SelectField";
import API from "services/api/api";
import Swal from "sweetalert2";

const userId =
  typeof window !== "undefined"
    ? Number(localStorage.getItem("authUserId"))
    : null;

const addressTypeOptions = [
  { id: "home", name: "Home" },
  { id: "office", name: "Office" },
];

export default function AddressForm({
  editId,
  setEditId,
  addresses,
  setAddresses,
  setSelectedAddressId,
  setSelectedAddress, // ✅ FIX ADDED
  setShowForm,
  showForm,
}) {
  const [form, setForm] = useState({
    user_id: userId || "",
    name: "",
    email: "",
    phone_number: "",
    address: "",
    street: "",
    apartment_suite: "",
    country_id: 230,
    state_id: "",
    city_id: "",
    zipcode: "",
    address_type: "",
    status: 1,
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // ✅ FETCH COUNTRIES
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await API.get("/countries");
        setCountries(res.data.data || []);
      } catch (err) {
        console.error("Country error:", err);
      }
    };
    fetchCountries();
  }, []);

  // ✅ FETCH STATES
  useEffect(() => {
    if (!form.country_id) return;

    const fetchStates = async () => {
      try {
        const res = await API.get(`/states/${form.country_id}`);
        setStates(res.data.data || []);
      } catch (err) {
        console.error("State error:", err);
      }
    };

    fetchStates();
  }, [form.country_id]);

  // ✅ FETCH CITIES
  useEffect(() => {
    if (!form.state_id) return;

    const fetchCities = async () => {
      try {
        const res = await API.get(`/cities/${form.state_id}`);
        setCities(res.data.data || []);
      } catch (err) {
        console.error("City error:", err);
      }
    };

    fetchCities();
  }, [form.state_id]);

  // ✅ EDIT PREFILL
  useEffect(() => {
    if (editId) {
      const addr = addresses.find((a) => a.id === editId);

      if (addr) {
        setForm({
          user_id: addr.user?.id || "",
          name: addr.name || "", // ✅ NAME PREFILL
          email: addr.email || "",
          phone_number: addr.phone_number || "",
          street: addr.street || "",
          apartment_suite: addr.apartment_suite || "",
          country_id: addr.country?.id || "",
          state_id: addr.state?.id || "",
          city_id: addr.city?.id || "",
          zipcode: addr.zipcode || "",
          address_type: addr.address_type || "",
          status: addr.status || 1,
        });
      }
    }
  }, [editId, addresses]);

  const update = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  // ✅ SAVE
  const saveAddress = async () => {
    if (!form.name.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter your name.",
      });
    }

    if (!form.email.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter your email address.",
      });
    }

    if (!form.phone_number.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter your phone number.",
      });
    }

    if (!form.street.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter your street address.",
      });
    }

    if (!form.state_id) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select a state.",
      });
    }

    if (!form.city_id) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select a city.",
      });
    }

    if (!form.zipcode.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter your postcode.",
      });
    }
    const isLoggedIn = !!userId;

    // ✅ GET SELECTED NAMES
    const selectedCountry = {
      id: 230,
      name: "United Kingdom",
    };
    const selectedState = states.find((s) => s.id == form.state_id);
    const selectedCity = cities.find((c) => c.id == form.city_id);

    if (isLoggedIn) {
      // ✅ LOGGED-IN FLOW
      const payload = {
        ...form,
        user_id: userId,
        name: form.name,
        country_name: "United Kingdom",
        state_name: selectedState?.name || "",
        city_name: selectedCity?.name || "",
      };

      try {
        if (editId) {
          // Update existing address
          const res = await updateAddress(editId, payload);

          if (res?.success) {
            const updated = res.data;

            setAddresses((prev) =>
              prev.map((a) => (a.id === editId ? { ...a, ...updated } : a)),
            );

            setSelectedAddress(updated);
            setSelectedAddressId(updated?.id);
            setEditId(null);
            setShowForm(false);

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Address updated successfully.",
              timer: 2000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: res?.message || "Unable to update the address.",
            });
          }
        } else {
          // Add new address
          const res = await addAddress(payload);

          if (res?.success) {
            const newAddr = res.data;

            setAddresses((prev) => [...prev, newAddr]);
            setSelectedAddress(newAddr);
            setSelectedAddressId(newAddr?.id);
            setShowForm(false);

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Address added successfully.",
              timer: 2000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Add Failed",
              text: res?.message || "Unable to add the address.",
            });
          }
        }
      } catch (err) {
        console.error("Error saving address:", err);

        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
        });
      }
    } else {
      // ✅ GUEST FLOW
      const guestAddress = {
        guest_name: form.name,
        guest_email: form.email,
        guest_phone_number: form.phone_number,
        guest_street: form.street,
        guest_apartment_suite: form.apartment_suite,
        guest_country_id: 230,
        guest_country_name: "United Kingdom",
        guest_state_id: Number(form.state_id),
        guest_state_name: selectedState?.name || "",
        guest_city_id: Number(form.city_id),
        guest_city_name: selectedCity?.name || "",
        guest_zipcode: form.zipcode,
      };

      // Safety: ensure required fields
      if (
        !guestAddress.guest_name ||
        !guestAddress.guest_email ||
        !guestAddress.guest_phone_number ||
        !guestAddress.guest_street ||
        !guestAddress.guest_city_name ||
        !guestAddress.guest_state_name ||
        !guestAddress.guest_country_name
      ) {
        console.error("Incomplete guest address fields");
        return;
      }

      // Store in localStorage
      localStorage.setItem("guestAddress", JSON.stringify(guestAddress));
      // Update UI
      setSelectedAddress(guestAddress);
      setSelectedAddressId("guest"); // important
      setShowForm(false);
    }
  };

  return (
    <>
      {showForm && (
        <div className="mt-6 space-y-3 border-t pt-4">
          <InputField
            label="Recipient name"
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />

          <InputField
            label="Email"
            required
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <InputField
            label="Phone Number"
            required
            type="tel"
            placeholder="07123 456789"
            pattern="^(\\+44\\s?7\\d{3}|07\\d{3})\\s?\\d{3}\\s?\\d{3}$"
            value={form.phone_number}
            onChange={(e) => update("phone_number", e.target.value)}
          />

          <InputField
            label="Address line 1"
            required
            placeholder="Enter your address line 1"
            value={form.street}
            onChange={(e) => update("street", e.target.value)}
          />

          <InputField
            label="Address line 2"
            required
            placeholder="Address line 2"
            value={form.apartment_suite}
            onChange={(e) => update("apartment_suite", e.target.value)}
          />
          <SelectField
            label="City/Town"
            required
            value={form.state_id}
            onChange={(e) => update("state_id", e.target.value)}
            options={states}
            placeholder="Select City/Town"
          />

          <SelectField
            label="County"
            required
            value={form.city_id}
            onChange={(e) => update("city_id", e.target.value)}
            options={cities}
            placeholder="Select County"
          />

          <InputField
            label="Postcode"
            required
            placeholder="SW1A 1AA"
            pattern="^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$"
            value={form.zipcode}
            onChange={(e) => update("zipcode", e.target.value.toUpperCase())}
          />

          <SelectField
            label="Address Type"
            required
            value={form.address_type}
            onChange={(e) => update("address_type", e.target.value)}
            options={addressTypeOptions}
            placeholder="Select Type"
          />

          <button
            onClick={saveAddress}
            className="bg-black text-white px-4 py-2 text-xs w-full"
          >
            {editId ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
          </button>
        </div>
      )}
    </>
  );
}
