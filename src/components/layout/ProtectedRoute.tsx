import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router";
import { verifyToken } from "../../utils/verifyToken";
type TProtected = {
  children: ReactNode;
  role: string | undefined;
};
export const ProtectedRoute = ({ children, role }: TProtected) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
