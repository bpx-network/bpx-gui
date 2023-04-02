import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, RouteProps } from 'react-router-dom';
// import type { RootState } from '../../../../modules/rootReducer';

type RootState = any;
type Props = RouteProps;

export default function GuestRoute(props: Props) {
    return <Navigate to="/dashboard" />;
}
