import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import BackgroundProductCard from '../BackgroundProductCard';
import BackgroundImage from '..../assets/backgrounds/Room1.png';

it('renders correctly when only value and image are provided', () => {
    const value = 300
    const productName = 'Background'

    const { getByText, queryByRole, queryByText } = render(
        <BackgroundProductCard value={value} image={BackgroundImage} />
    );

    // Ensure the cost of the background appears correctly
    expect(getByText('300')).toBeInTheDocument();
    // Ensure the product name does not appear
    expect(queryByText('Background')).not.toBeInTheDocument();

    // Check that there is an image
    const image = queryByRole('Image');
    expect(image).toBeDefined();
});

it('renders correctly when only value and productName are provided', () => {
    const value = 300
    const productName = 'Background'

    const { getByText, queryByRole } = render(
        <BackgroundProductCard value={value} productName={productName} />
    );

    // Ensure the cost of the background appears correctly
    expect(getByText('300')).toBeInTheDocument();
    // Ensure the product name appears correctly
    expect(getByText('Background')).toBeInTheDocument();

    // Check that there are no images
    const image = queryByRole('Image');
    expect(image).toBeNull();
});

it('renders correctly when all inputs are provided', () => {
    const value = 300
    const productName = 'Background'
    const productId = 2487979798

    const { getByText, queryByRole } = render(
        <BackgroundProductCard value={value} productName={productName} image={BackgroundImage} productId={productId} />
    );

    // Ensure the cost of the background appears correctly
    expect(getByText('300')).toBeInTheDocument();
    // Ensure the product name appears correctly
    expect(getByText('Background')).toBeInTheDocument();

    // Check that there is an image
    const image = queryByRole('Image');
    expect(image).toBeDefined();
});

