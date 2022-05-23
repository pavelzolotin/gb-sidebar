import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const { select } = wp.data;

const FeaturedMedia = () => {
	const mediaID = useSelect((select) => {
		return select('core/editor').getEditedPostAttribute('meta')
			._gb_sidebar_media_id_meta;
	});

	const mediaURL = useSelect((select) => {
		return select('core/editor').getEditedPostAttribute('meta')
			._gb_sidebar_media_url_meta;
	});

	const removeVideo = () => {
		editPost({
			meta: {
				_gb_sidebar_media_id_meta: 0,
				_gb_sidebar_media_url_meta: '',
			},
		});
	};

	const { editPost } = useDispatch('core/editor');

	return (
		<>
			{mediaURL ? (
				<div className='wp-block-gb-sidebar__media'>
					<video
						src={mediaURL}
						className='wp-block-gb-sidebar__video'
						disableMediaButtons={mediaURL}
						autoPlay
						muted
						loop
					/>
					<Button onClick={removeVideo} isDestructive>
						{__('Remove featured video', 'gb-sidebar')}
					</Button>
				</div>
			) : (
				<MediaPlaceholder
					icon='format-video'
					labels={{
						title: __('Video', 'gb-sidebar'),
						instructions: __(
							'This video can be used instead of Players Item image for a preview thumbnail.',
							'gb-sidebar'
						),
					}}
					onSelect={(value) => {
						editPost({
							meta: {
								_gb_sidebar_media_id_meta: value.id,
								_gb_sidebar_media_url_meta: value.url,
							},
						});
					}}
					accept='video/*'
					allowedTypes={['video']}
				/>
			)}
		</>
	);
};

registerPlugin('gb-media-plugin', {
	render: () => {
		const postType = select('core/editor').getCurrentPostType();
		if (postType !== 'gutenberg_players') {
			return null;
		}

		return (
			<PluginDocumentSettingPanel
				name='gb-media'
				title={__('Featured Video', 'gb-sidebar')}
				icon='format-video'
			>
				<FeaturedMedia />
			</PluginDocumentSettingPanel>
		);
	},
});
