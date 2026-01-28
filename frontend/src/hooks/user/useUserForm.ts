import { useEffect, useState, type ChangeEvent, type FormEvent, useCallback } from 'react';

import { showError, showSuccess } from '@/utils';
import type { ErrorDetail, UserFormState, Users } from '@/interface';
import { USER_ACTION, USER_STATUS, type UserAction } from '@/types/user.type';
import { SYSTEM_ROLE } from '@/types/role.types';
import userService from '@/services/user.service';

const INITIAL_FORM_STATE: UserFormState = {
  id: 0,
  fullName: '',
  email: '',
  role: SYSTEM_ROLE.STUDENT,
  password: '',
  status: USER_STATUS.ACTIVE,
  username: '',
};

export const useUserForm = (
  onSuccess: () => void,
  action: UserAction,
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
    if (!isOpen) return;

    setFieldErrors([]);
    setError('');
    setShowPassword(false);

    switch (action) {
      case USER_ACTION.CREATE:
        setFormData(INITIAL_FORM_STATE);
        break;

      case USER_ACTION.UPDATE:
      case USER_ACTION.VIEW:
        if (userData) {
          setFormData({
            id: userData.userId,
            fullName: userData.fullName ?? '',
            email: userData.email ?? '',
            role: userData.role ?? SYSTEM_ROLE.STUDENT,
            status: userData.status ?? USER_STATUS.ACTIVE,
            username: userData.username ?? '',
            password: '',
          });
        }
        break;
    }
  }, [action, userData, isOpen]);

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
      let response;

      if (action === USER_ACTION.CREATE) {
        response = await userService.createUser(formData);
      }

      if (action === USER_ACTION.UPDATE) {
        const updateData = {
          ...formData,
          id: userData?.userId,
        };

        if (!updateData.password) {
          delete updateData.password;
        }

        response = await userService.updateUser(updateData);
      }

      if (response?.success) {
        showSuccess(
          action === USER_ACTION.CREATE
            ? 'Đã tạo mới người dùng thành công'
            : 'Đã cập nhật người dùng thành công'
        );

        onSuccess();
      }
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
    resetForm,
  };
};
