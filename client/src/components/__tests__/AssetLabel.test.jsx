import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import AssetLabel from '../AssetLabel';
import AssetXPIcon from ".../assets/asset-xp-icon.svg";

it('renders correctly when only value is provided', () => {
    const value = 300

    const { getByText, queryByRole } = render(
        <AssetLabel value={value} />
    );

    // Ensure the user's experience / coins appears correctly.
    expect(getByText('300')).toBeInTheDocument();

    // Check that there are no images
    const image = queryByRole('Image');
    expect(image).toBeNull();
});

it('renders correctly when the value and image are supplied', () => {
    const value = 500

    const { getByText, queryByRole } = render(
        <AssetLabel image={AssetXPIcon} value={value} />
    );

    // Ensure the user's experience / coins appears correctly.
    expect(getByText('500')).toBeInTheDocument();

    // Check that there's an image
    const image = queryByRole('Image');
    expect(image).toBeDefined();
});
