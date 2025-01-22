import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router";
type TProtected = {
  children: ReactNode;
  role: string | undefined;
};
export const ProtectedRoute = ({ children, role }: TProtected) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
