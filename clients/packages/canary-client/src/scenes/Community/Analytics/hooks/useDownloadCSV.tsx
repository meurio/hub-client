import React, { useState, useContext } from 'react';
import { toast, Success } from 'bonde-components';
import { Context as SessionContext } from 'bonde-core-tools';
import downloadjs from 'downloadjs'

export type PathDownload = 'donation_reports' | 'download_subscriptions' | 'activist_actions' | 'activists';

interface DownloadCSVResult {
  loading: boolean;
  onClick: () => Promise<void>;
}

const useDownloadCSV = (path: PathDownload): DownloadCSVResult => {
    const [loading, setLoading] = useState(false);
    const { community, token } = useContext(SessionContext);
    const apiUrl = process.env.REACT_APP_DOMAIN_API_REST;
    const headers = { 'access-token': token || 'no-token' };
    const reportNames = {
      donation_reports: 'Doação',
      download_subscriptions: 'Doação recorrente',
      activist_actions: 'Ações',
      activists: 'Ativistas'
    }
  
    const handleClick = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/communities/${community?.id}/${path}.csv`, { method: 'GET', headers });
  
        if (response.status === 200) {
          const filename = `[Relatório][${reportNames[path]}] ${community?.name}.csv`;
          downloadjs(new Blob([(await response.blob())]), filename, 'text/csv');
          
          toast(<Success message={`O download de ${filename} foi feito com sucesso.`} />, { type: toast.TYPE.SUCCESS });
        }
        setLoading(false);
      } catch (err) {
        console.error('error', err);
        toast((err as any).message, { type: toast.TYPE.ERROR });
        setLoading(false);
      }
    }

    return { loading, onClick: handleClick }
}

export default useDownloadCSV;