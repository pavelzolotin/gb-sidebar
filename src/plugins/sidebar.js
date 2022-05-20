import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const FooterOptions = () => {
	const fooWidgetsToggle = useSelect((select) => {
		return select('core/editor').getEditedPostAttribute('meta')
			._gb_sidebar_footer_widgets;
	});

	const { editPost } = useDispatch('core/editor');

	return (
		<PanelBody title={__('Footer widgets', 'gb-sidebar')}>
			<ToggleControl
				label={__('Show/hide footer widgets', 'gb-sidebar')}
				value={fooWidgetsToggle}
				help={
					fooWidgetsToggle
						? __('Show footer widgets.', 'gb-sidebar')
						: __('Hide footer widgets.', '')
				}
				onChange={(value) => {
					editPost({
						meta: { _gb_sidebar_footer_widgets: value },
					});
				}}
				checked={fooWidgetsToggle}
			/>
		</PanelBody>
	);
};

registerPlugin('gb-sidebar-plugin', {
	render: () => {
		return (
			<PluginSidebar
				name='gb-sidebar'
				icon='admin-settings'
				title={__('Custom Sidebar Options', 'gb-sidebar')}
			>
				<FooterOptions />
			</PluginSidebar>
		);
	},
});
