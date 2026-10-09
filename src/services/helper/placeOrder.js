import { createOrder } from "services/api/order";
import API from "services/api/api";

// ✅ PAYU REDIRECT FUNCTION
const redirectToPayU = ({ action, fields }) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = action;

  Object.keys(fields).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = fields[key];
    form.appendChild(input);
  });

  // ✅ SUCCESS URL
  const surl = document.createElement("input");
  surl.type = "hidden";
  surl.name = "surl";
  surl.value = `${window.location.origin}/payment/success`;

  // ❌ FAILURE URL
  const furl = document.createElement("input");
  furl.type = "hidden";
  furl.name = "furl";
  furl.value = `${window.location.origin}/payment/failure`;

  form.appendChild(surl);
  form.appendChild(furl);

  document.body.appendChild(form);
  form.submit();
};

// ✅ MAIN FUNCTION - RENAMED TO handlePayU
export const handlePayU = async ({
  cart,
  selectedAddressId,
  shippingMethodId,
}) => {
  try {
    console.log("Placing order with cart:", cart);
    console.log("Selected address ID:", selectedAddressId);
    console.log("shippingMethodId:", shippingMethodId);

    const userId = localStorage.getItem("authUserId");
    const authToken = localStorage.getItem("authToken");
    const guestToken = localStorage.getItem("guest_token");
    const isLoggedIn = !!(userId && authToken);

    console.log("User Type:", isLoggedIn ? "USER" : "GUEST");

    // ✅ VALIDATION
    if (isLoggedIn) {
      if (!selectedAddressId) {
        return { success: false, message: "Please select address ❌" };
      }
    } else {
      // Guest validation
      const guestAddressStr = localStorage.getItem("guestAddress");
      if (!guestAddressStr) {
        return { success: false, message: "Guest address not found ❌" };
      }
      let guestAddress;
      try {
        guestAddress = JSON.parse(guestAddressStr);
        console.log("Guest Address:", guestAddress);
      } catch (e) {
        return { success: false, message: "Invalid guest address ❌" };
      }
      if (
        !guestAddress.guest_name ||
        !guestAddress.guest_email ||
        !guestAddress.guest_phone_number ||
        !guestAddress.guest_street ||
        !guestAddress.guest_city_name ||
        !guestAddress.guest_state_name ||
        !guestAddress.guest_country_name
      ) {
        return { success: false, message: "Incomplete guest address ❌" };
      }
    }

    if (!cart || cart.length === 0) {
      return { success: false, message: "Cart is empty ❌" };
    }

    // ✅ ITEMS FORMAT
    const items = cart.map((item) => ({
      product_id: item.product?.id,
      quantity: item.quantity,
      price: Number(item.price),
      color_id: item.color?.id || null,
      size_id: item.size?.id || null,
    }));

    // ✅ TOTAL CALCULATION
    const total_amount = cart.reduce(
      (sum, item) => sum + Number(item.total || item.price * item.quantity),
      0,
    );

    // ✅ PAYLOAD BUILDING
    let payload = {
      payment_type: "payu",
      items,
      total_amount,
    };

    if (isLoggedIn) {
      payload.user_address_id = selectedAddressId;
      payload.user_id = userId;
      payload.session_id = userId;
      payload.shipping_method_id = shippingMethodId ?? "";
    } else {
      const guestAddress = JSON.parse(localStorage.getItem("guestAddress"));

      payload.name = guestAddress.guest_name;
      payload.email = guestAddress.guest_email;
      payload.phone = guestAddress.guest_phone_number;

      payload.shipping_address = `${guestAddress.guest_street}, ${guestAddress.guest_apartment_suite}, ${guestAddress.guest_city_name}, ${guestAddress.guest_state_name}, ${guestAddress.guest_country_name}`;

      payload.guest_pincode = guestAddress.guest_zipcode;
      payload.guest_city_name = guestAddress.guest_city_name;
      payload.guest_state_name = guestAddress.guest_state_name;
      payload.guest_country_name = guestAddress.guest_country_name;

      payload.guest_city = Number(guestAddress.guest_city_id);
      payload.guest_state = Number(guestAddress.guest_state_id);
      payload.guest_country = Number(guestAddress.guest_country_id);

      payload.city_id = Number(guestAddress.city_id) || null;
      payload.state_id = Number(guestAddress.state_id) || null;
      payload.country_id = Number(guestAddress.country_id) || null;

      payload.shipping_method_id = shippingMethodId ?? "";
    }

    console.log("shippingMethodId:", shippingMethodId);
    console.log("Final Payload:", payload);
    console.log("Final Payload JSON:", JSON.stringify(payload, null, 2));

    // ✅ API CALL
    let data;
    if (isLoggedIn) {
      data = await createOrder(payload, authToken);
    } else {
      data = await API.post(`/orders?guest_token=${guestToken}`, payload, {
        headers: {}, // No Authorization for guest
      });
      data = data.data;
    }
    console.log("Order response:", data);

    // ===============================
    // ✅ HANDLE PAYU RESPONSE
    // ===============================
    if (data?.payment?.action && data?.payment?.fields) {
      redirectToPayU(data.payment);

      return {
        success: true,
        redirecting: true,
        message: "Redirecting to PayU...",
      };
    }

    // ===============================
    // ✅ HANDLE STRIPE RESPONSE
    // ===============================
    if (data?.checkout_url) {
      window.location.href = data.checkout_url;

      return {
        success: true,
        redirecting: true,
        message: "Redirecting to Stripe...",
      };
    }

    // ===============================
    // ✅ NORMAL ORDER (COD etc.)
    // ===============================
    // Cleanup after success
    if (!isLoggedIn) {
      localStorage.removeItem("guestAddress");
    } else {
      // TODO: Refresh cart and menu counts (e.g., call getCart and getMenu, update state)
    }

    return {
      success: true,
      data,
      message: "Order placed successfully ✅",
    };
  } catch (error) {
    console.error("Order error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong ❌",
    };
  }
};

// ✅ BACKWARD COMPATIBILITY
export const placeOrder = handlePayU;
