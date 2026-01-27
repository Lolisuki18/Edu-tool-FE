import { useEffect, useState, type ChangeEvent, type FormEvent, useCallback } from 'react';

import { showError, showSuccess } from '@/utils';
import type { ErrorDetail, UserFormState, Users } from '@/types/interface';
import { USER_STATUS } from '@/types/user.type';
import { SYSTEM_ROLE } from '@/types/role.types';
import userService from '@/services/user.service';

const INITIAL_FORM_STATE: UserFormState = {
  fullName: '',
  email: '',
  role: SYSTEM_ROLE.STUDENT,
  password: '',
  status: USER_STATUS.ACTIVE,
  username: '',
};

export const useUserForm = (
  onSuccess: () => void,
  isCreate: boolean,
  userData?: Users | null,
  isOpen?: boolean
) => {
  const [formData, setFormData] = useState<UserFormState>(INITIAL_FORM_STATE);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<ErrorDetail[]>([]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setFieldErrors([]);
    setError('');
    setShowPassword(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (!isCreate && userData) {
        setFormData({
          fullName: userData.fullName ?? '',
          email: userData.email ?? '',
          role: userData.role ?? SYSTEM_ROLE.STUDENT,
          password: '',
          status: userData.status ?? USER_STATUS.ACTIVE,
          username: userData.username ?? '',
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, isCreate, userData, resetForm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors.length > 0) {
      setFieldErrors(prev => prev.filter(err => err.field !== name));
    }
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const actionMessage = isCreate ? 'Tạo mới' : 'Cập nhật';
      console.log(`${actionMessage} dữ liệu:`, formData);

      if (isCreate) {
        const response = await userService.createUser(formData);
        if (response.success) {
          resetForm();
          showSuccess('Đã tạo mới người dùng thành công');
        }
      }
      if (!isCreate) {
        formData.id = userData?.userId;
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        const response = await userService.updateUser(updateData);
        if (response.success) {
          resetForm();
          showSuccess('Đã cập nhập người dùng thành công');
        }
      }

      onSuccess();
      if (isCreate) resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showError('Có lỗi khi thực hiện: ' + msg);
      setError('Thao tác thất bại. Vui lòng kiểm tra lại!');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    fieldErrors,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword: () => setShowPassword(prev => !prev),
  };
};
