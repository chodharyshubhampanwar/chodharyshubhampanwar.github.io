const form = document.getElementById("form");
form.addEventListener('submit', handleFormSubmit)
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const url = form.action;


    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });

        console.log({ responseData });
    } catch (error) {
        console.error(error);
    }
}

async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: (formDataJsonString, { "api_key": "887acf1b-fe60-4440-adec-0cff51c7da70", "status": "SUBSCRIBED" })
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

