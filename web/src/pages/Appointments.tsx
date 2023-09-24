import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import { Appointment } from '../schemas/Appointment';
import { getAppointments } from '../services/AppointmentService';

export default function Appointments () {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const requestAppointments = () => {
        getAppointments().then(appointmentsResponse =>
            setAppointments(appointmentsResponse)
        );
    };

    useEffect(() => {
        requestAppointments()
    }, []);

    const columns: ColumnsType<Appointment> = [
        {
            title: 'Solicitante',
            dataIndex: 'requester',
            key: 'requester',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Início',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Fim',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'CR',
            dataIndex: 'resultCenter',
            key: 'resultCenter',
        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Projeto',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: 'Justificativa',
            dataIndex: 'justification',
            key: 'justification',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ]

    return (
        <div>
            <AppointmentForm callback={requestAppointments} />
            {appointments? (
                <Table dataSource={appointments} columns={columns} />
            ) : (
                null
            )}

        </div>
    );
}
