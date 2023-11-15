const url = "http://localhost:3001/api/v1";

export async function getRandomImg() {
  try {
    const res = await fetch(`${url}/images`);
    const img = await res.json();
    return img.data.image[0].url;
  } catch (error) {
    console.log(error);
  }
}

export async function newPerson(data) {
  try {
    const res = await fetch(`${url}/persons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newP = await res.json();
    return newP.data.person;
  } catch (error) {
    alert("Add new friend fail");
  }
}

export async function updatePerson(id, data) {
  try {
    const res = await fetch(`${url}/persons/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newP = await res.json();
    return newP.data.person;
  } catch (error) {
    console.log(error);
  }
}

export async function getFriends() {
  try {
    const res = await fetch(`${url}/persons`);
    const data = await res.json();
    return data.data.persons;
  } catch (error) {
    console.log(error);
  }
}

export async function newBill(billData) {
  try {
    const res = await fetch(`${url}/bills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billData),
    });

    const data = await res.json();
    return data.data.bill;
  } catch (error) {
    console.log(error);
  }
}

export async function getBill(id) {
  try {
    const res = await fetch(`${url}/persons/${id}/bills`);
    const data = await res.json();
    return data.data.bill;
  } catch (error) {
    console.log(error);
  }
}
