import { db, admin } from "../config/firebase.js";

export async function createEmployee(req, res) {
  const { name, email, role, phone, address } = req.body;

  // Validate required fields
  if (!email || !name) {
    return res.status(400).json({
      success: false,
      message: "Email and name are required fields",
    });
  }

  try {

    const employeeRef = db.collection("employees").doc(email);
    const existingEmployee = await employeeRef.get();

    if (existingEmployee.exists) {
      return res.status(409).json({
        success: false,
        message: "Employee with this email already exists",
      });
    }

    const employeeData = {
      name,
      email,
      role: role || "",
      phone: phone || "",
      address: address || "",
      active: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await employeeRef.set(employeeData);

    res.status(201).json({
      success: true,
      employee: employeeData,
      message: "Employee created successfully",
    });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
      error: err.message,
    });
  }
}

export async function getEmployee(req, res) {
  const { email } = req.params;

  try {
    const snap = await db.collection("employees").doc(email).get();

    if (!snap.exists)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json(snap.data());
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getAllEmployee(req, res) {
  try {
    const snap = await db.collection("employees").get();
    console.log("snap", snap);
    if (!snap)
      return res
        .status(404)
        .json({ success: false, message: "Employees collection not exists!" });

    const employees = [];
    snap.forEach((doc) => {
      employees.push(doc.data());
    });

    res.status(200).json(employees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteEmployee(req, res) {
  const { email } = req.params;

  console.log("email", email);

  try {
    await db.collection("employees").doc(email).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
