import React from 'react'
import { toast } from 'bonde-components'
import { Button } from 'bonde-components/chakra';
import copy from 'clipboard-copy';
import { RowProps } from './InvitationsTable'

const Reseted = (t: any) => ({ row: { original: data } }: RowProps) => {
    const token = data.user.reset_password_token;

    const copyLink = () => {
        copy(`${process.env.REACT_APP_DOMAIN_ACCOUNTS}/reset-password?token=${token}`);
        return toast(t('mobilizers.table.actions.copy.success'), { type: toast.TYPE.SUCCESS });
    }

    return token ? <Button href="#" onClick={copyLink} colorScheme="gray" variant="tableLink">{t('mobilizers.table.actions.copy.label')}</Button> : <></>
}

export default Reseted;