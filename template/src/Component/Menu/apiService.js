import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET requests
export const getTableData = (tableName) => apiClient.get(`/getTableData/${tableName}`);
export const getSingleData = (tableName, id) => apiClient.get(`/getSingleData/${tableName}/${id}`);

// POST requests
export const addData = (tableName, data) => {
  return apiClient.post(`/addData/${tableName}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

// PUT requests
export const updateData = (tableName, id, data) => apiClient.put(`/updateData/${tableName}/${id}`, data);

// DELETE requests
export const deleteData = (entity, id) => apiClient.delete(`/delete/${entity}/${id}`);

// QUERY requests
export const customQuery = (tableName, queryType, options) => apiClient.post('/query', { tableName, queryType, options });

// Specific table methods (if needed for clarity)
export const getDoctor = () => getTableData('DOCTOR');
export const getCustomer = () => getTableData('CUSTOMER');
export const getMedicalShop = () => getTableData('MEDICAL_SHOP');
export const getEmployees = () => getTableData('EMPLOYEES');
export const getInventory = () => getTableData('INVENTORY');
export const getCompanies = () => getTableData('COMPANIES');
export const getPaymentHistory = () => getTableData('PAYMENT_HISTORY');
export const getSupplier = () => getTableData('SUPPLIER');
export const getSupplyHistory = () => getTableData('SUPPLY_HISTORY');

export const getDoctorById = (id) => getSingleData('DOCTOR', id);
export const getCustomerById = (id) => getSingleData('CUSTOMER', id);
export const getMedicalShopById = (id) => getSingleData('MEDICAL_SHOP', id);
export const getEmployeesById = (id) => getSingleData('EMPLOYEES', id);
export const getInventoryById = (id) => getSingleData('INVENTORY', id);
export const getCompaniesById = (id) => getSingleData('COMPANIES', id);
export const getPaymentHistoryById = (id) => getSingleData('PAYMENT_HISTORY', id);
export const getSupplierById = (id) => getSingleData('SUPPLIER', id);
export const getSupplyHistoryById = (id) => getSingleData('SUPPLY_HISTORY', id);

export const createDoctor = (data) => addData('DOCTOR', data);
export const createCustomer = (data) => addData('CUSTOMER', data);
export const createMedicalShop = (data) => addData('MEDICAL_SHOP', data);
export const createEmployees = (data) => addData('EMPLOYEES', data);
export const createInventory = (data) => addData('INVENTORY', data);
export const createCompanies = (data) => addData('COMPANIES', data);
export const createPaymentHistory = (data) => addData('PAYMENT_HISTORY', data);
export const createSupplier = (data) => addData('SUPPLIER', data);
export const createSupplyHistory = (data) => addData('SUPPLY_HISTORY', data);

export const updateDoctor = (id, data) => updateData('DOCTOR', id, data);
export const updateCustomer = (id, data) => updateData('CUSTOMER', id, data);
export const updateMedicalShop = (id, data) => updateData('MEDICAL_SHOP', id, data);
export const updateEmployees = (id, data) => updateData('EMPLOYEES', id, data);
export const updateInventory = (id, data) => updateData('INVENTORY', id, data);
export const updateCompanies = (id, data) => updateData('COMPANIES', id, data);
export const updatePaymentHistory = (id, data) => updateData('PAYMENT_HISTORY', id, data);
export const updateSupplier = (id, data) => updateData('SUPPLIER', id, data);
export const updateSupplyHistory = (id, data) => updateData('SUPPLY_HISTORY', id, data);

export const deleteDoctor = (id) => deleteData('DOCTOR', id);
export const deleteCustomer = (id) => deleteData('CUSTOMER', id);
export const deleteMedicalShop = (id) => deleteData('MEDICAL_SHOP', id);
export const deleteEmployees = (id) => deleteData('EMPLOYEES', id);
export const deleteInventory = (id) => deleteData('INVENTORY', id);
export const deleteCompanies = (id) => deleteData('COMPANIES', id);
export const deletePaymentHistory = (id) => deleteData('PAYMENT_HISTORY', id);
export const deleteSupplier = (id) => deleteData('SUPPLIER', id);
export const deleteSupplyHistory = (id) => deleteData('SUPPLY_HISTORY', id);

// Custom query methods
// export const selectQuery = (tableName, options) => customQuery(tableName, 'SELECT', options);
// export const joinQuery = (tableName, options) => customQuery(tableName, 'JOIN', options);

export const selectQuery = async (tableName, options) => {
  try {
    const response = await apiClient.post('/query', {
      tableName,
      queryType: 'SELECT',
      options,
    });
    return response.data;
  } catch (error) {
    console.error('Error performing SELECT query:', error);
    throw error;
  }
};

export const joinQuery = async (tableName, options) => {
  try {
    const response = await apiClient.post('/query', {
      tableName,
      queryType: 'JOIN',
      options,
    });
    return response.data;
  } catch (error) {
    console.error('Error performing JOIN query:', error);
    throw error;
  }
};