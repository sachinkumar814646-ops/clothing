"use client";
import { deleteAddress } from "services/api/address";
import { MapPin } from "lucide-react";

export default function AddressList({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  setSelectedAddress,
  setShowForm,
  setEditId,
  setAddresses,
  selectedAddress, // Add this prop
}) {

  const handleEdit = (addr) => {
    setEditId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAddress(id);
      console.log("Delete response:", response);

      const filtered = addresses.filter((a) => a.id !== id);
      setAddresses(filtered);

      // ✅ HANDLE SELECTED AFTER DELETE
      if (selectedAddressId === id) {
        if (filtered.length > 0) {
          setSelectedAddressId(filtered[0].id);
          setSelectedAddress(filtered[0]);
        } else {
          setSelectedAddressId(null);
          setSelectedAddress(null);
        }
      }

    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  const isGuest = typeof window !== "undefined" && !localStorage.getItem("authUserId");

  return (
    <div>
      <h2 className="mb-6 text-xs">
        {isGuest ? "GUEST SELECT ADDRESS" : "SELECT ADDRESS"}
      </h2>

      <div className="space-y-4">
        {/* Guest Address */}
        {selectedAddressId === "guest" && selectedAddress && (
          <div className="border p-4 bg-blue-50">
            <label className="flex gap-3 cursor-pointer">
              <input
                type="radio"
                checked={selectedAddressId === "guest"}
                onChange={() => {
                  // Already selected
                }}
              />

              <div>
                <p>{selectedAddress.guest_name}</p>
                <p className="text-xs">
                  {selectedAddress.guest_email}, {selectedAddress.guest_phone_number}
                </p>

                <p className="text-xs">
                  {selectedAddress.guest_apartment_suite}, {selectedAddress.guest_street}
                </p>

                <p className="text-xs">{selectedAddress.guest_zipcode}</p>

                <p className="text-xs">
                  {selectedAddress.guest_state_name}, {selectedAddress.guest_city_name}, {selectedAddress.guest_country_name}
                </p>

              </div>
            </label>
          </div>
        )}

        {addresses.length === 0 && selectedAddressId !== "guest" && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-10 text-center">
            <MapPin className="h-12 w-12 text-gray-400" />

            <h3 className="mt-3 text-sm font-medium text-gray-700">
              No Address Selected
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Please add a new address to continue.
            </p>
          </div>
        )}

        {/* User Addresses */}
        {addresses.map((addr) => (
          <div key={addr.id} className="border p-4">
            <div className="flex justify-between">

              <label className="flex gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={selectedAddressId === addr.id}
                  onChange={() => {
                    setSelectedAddressId(addr.id);
                    setSelectedAddress(addr); // ✅ FIX
                  }}
                />

                <div>
                  <p>{addr.name}</p>
                  <p className="text-xs">
                    {addr.email}, {addr.phone_number}
                  </p>

                  <p className="text-xs">
                    {addr?.apartment_suite}, {addr?.street}
                  </p>

                  <p className="text-xs">{addr.zipcode}</p>

                  <p className="text-xs">
                    {addr.state?.name || addr.state || addr.state_name},{" "}
                    {addr.city?.name || addr.city || addr.city_name},{" "}
                    {addr.country?.name || addr.country || addr.country_name}
                  </p>

                  {addr.isDefault && (
                    <span className="text-green-600 text-xs">
                      DEFAULT
                    </span>
                  )}
                </div>
              </label>

              <div className="flex gap-2 text-xs">
                <button onClick={() => handleEdit(addr)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(addr.id)}>
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

<button
  onClick={() => setShowForm(true)}
  className="mt-6 inline-flex items-center rounded-md border border-black-600 px-4 py-2 text-sm font-medium text-black-600 hover:bg-black-600 hover:text-black transition"
>
  + Add Address
</button>
    </div>
  );
}