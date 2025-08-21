export const baseUrl = import.meta.env.VITE_BASE_URL;

export const postRequest = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: data.message || "Something went wrong",
      };
    }

    return data;
  } catch (error) {
    return { error: true, message: error.message || "Request failed" };
  }
};

export const getRequest = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json(); 
    if (!response.ok) {
      return {
        error: true,
        message: data.message || "Something went wrong",
      };
    }

    return data;
  } catch (error) {
    return {
      error: true,
      message: error.message || "Request failed",
    };
  }
};
