import { useEffect, useState } from "react";
import { PayRateRuleSchema } from "../schemas/PayRateRule";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getPayRateRules } from "../services/PayRateRulesService";
import ParametrizationForm from "../components/ParametrizationForm";
import Popup, { PopupSchema } from "../components/PopUp";

export default function Parametrization() {
    const [payRateRules, setPayRateRules] = useState<PayRateRuleSchema[]>([]);
    
    const requestPayRateRules = () => {
        getPayRateRules().then(payRateRulesResponse =>
            setPayRateRules(payRateRulesResponse)
        );
    };
    
    const [popupData, setPopupData] = useState<PopupSchema | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        requestPayRateRules()
    }, []);

    const handleClose = () => {
        setShowPopup(false);
    };

    const columns: ColumnsType<PayRateRuleSchema> = [
        {
            title: 'Verba',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Período',
            dataIndex: 'shift',
            key: 'shift',
        },
        {
            title: 'Fim de semana',
            dataIndex: 'weekend',
            key: 'weekend',
        },
        {
            title: 'Mínimo de horas',
            dataIndex: 'minHourCount',
            key: 'minHourCount',
        },
        {
            title: 'Duração da hora',
            dataIndex: 'hourDuration',
            key: 'hourDuration',
        },
        {
            title: 'Porcentagem',
            dataIndex: 'percentage',
            key: 'percentage',
        },
        {
            title: 'Cumulativo',
            dataIndex: 'overlap',
            key: 'overlap',
        },
    ]
    // const [open, setOpen] = useState<boolean>(false);
    return (
        <div>
            <ParametrizationForm
                errorCallback={() => {}}
                successCallback={() => {}}
            />
            <button type="button" onClick={() => {
                    setPopupData({
                        text: 'Cadastro de Verbas',
                        buttons: [{ text: 'x', onClick: handleClose }],
                        isOpen: true,
                });
                    setShowPopup(true);}}>
            Cadastrar Verba
            </button>
            {payRateRules? (
                <Table dataSource={payRateRules} columns={columns} />
            ) : (
                null
            )}
            {showPopup && popupData && <Popup {...popupData} />}
        </div>
    );
    
}