import React from 'react';

export default function PageWrapper({ children, className }) {
	return <main className={'site-page' + (className ? ' ' + className : '')}>{children}</main>;
}
