import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET requests
export const getDoctor = () => apiClient.get('/getDoctor');
export const getCustomer = () => apiClient.get('/getCustomer');
export const getMedicalShop = () => apiClient.get('/getMedicalShop');
export const getEmployees = () => apiClient.get('/getEmployees');
export const getInventory = () => apiClient.get('/getInventory');
export const getCompanies = () => apiClient.get('/getCompanies');
export const getPaymentHistory = () => apiClient.get('/getPaymentHistory');
export const getSupplier = () => apiClient.get('/getSupplier');
export const getSupplyHistory = () => apiClient.get('/getSupplyHistory');

// GET by ID
export const getDoctorById = (id) => apiClient.get(`/getDoctor/${id}`);
export const getCustomerById = (id) => apiClient.get(`/getCustomer/${id}`);
export const getMedicalShopById = (id) => apiClient.get(`/getMedicalShop/${id}`);
export const getEmployeesById = (id) => apiClient.get(`/getEmployees/${id}`);
export const getInventoryById = (id) => apiClient.get(`/getInventory/${id}`);
export const getCompaniesById = (id) => apiClient.get(`/getCompanies/${id}`);
export const getPaymentHistoryById = (id) => apiClient.get(`/getPaymentHistory/${id}`);
export const getSupplierById = (id) => apiClient.get(`/getSupplier/${id}`);
export const getSupplyHistoryById = (id) => apiClient.get(`/getSupplyHistory/${id}`);

// POST requests
export const createDoctor = (data) => apiClient.post('/createDoctor', data);
export const createCustomer = (data) => apiClient.post('/createCustomer', data);
export const createMedicalShop = (data) => apiClient.post('/createMedicalShop', data);
export const createEmployees = (data) => apiClient.post('/createEmployees', data);
export const createInventory = (data) => apiClient.post('/createInventory', data);
export const createCompanies = (data) => apiClient.post('/createCompanies', data);
export const createPaymentHistory = (data) => apiClient.post('/createPaymentHistory', data);
export const createSupplier = (data) => apiClient.post('/createSupplier', data);
export const createSupplyHistory = (data) => apiClient.post('/createSupplyHistory', data);

// PUT requests
export const updateDoctor = (id, data) => apiClient.put(`/updateDoctor/${id}`, data);
export const updateCustomer = (id, data) => apiClient.put(`/updateCustomer/${id}`, data);
export const updateMedicalShop = (id, data) => apiClient.put(`/updateMedicalShop/${id}`, data);
export const updateEmployees = (id, data) => apiClient.put(`/updateEmployees/${id}`, data);
export const updateInventory = (id, data) => apiClient.put(`/updateInventory/${id}`, data);
export const updateCompanies = (id, data) => apiClient.put(`/updateCompanies/${id}`, data);
export const updatePaymentHistory = (id, data) => apiClient.put(`/updatePaymentHistory/${id}`, data);
export const updateSupplier = (id, data) => apiClient.put(`/updateSupplier/${id}`, data);
export const updateSupplyHistory = (id, data) => apiClient.put(`/updateSupplyHistory/${id}`, data);

// DELETE requests
export const deleteDoctor = (id) => apiClient.delete(`/deleteDoctor/${id}`);
export const deleteCustomer = (id) => apiClient.delete(`/deleteCustomer/${id}`);
export const deleteMedicalShop = (id) => apiClient.delete(`/deleteMedicalShop/${id}`);
export const deleteEmployees = (id) => apiClient.delete(`/deleteEmployees/${id}`);
export const deleteInventory = (id) => apiClient.delete(`/deleteInventory/${id}`);
export const deleteCompanies = (id) => apiClient.delete(`/deleteCompanies/${id}`);
export const deletePaymentHistory = (id) => apiClient.delete(`/deletePaymentHistory/${id}`);
export const deleteSupplier = (id) => apiClient.delete(`/deleteSupplier/${id}`);
export const deleteSupplyHistory = (id) => apiClient.delete(`/deleteSupplyHistory/${id}`);
