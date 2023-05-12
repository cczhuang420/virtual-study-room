import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import AssetTypeButton from '../AssetTypeButton';

it('renders correctly when title is not supplied', () => {
    const amount = 50
    const title = 'Hello'

    const { getByText, queryByText } = render(
        <AssetTypeButton amount={amount} onClick={true} shouldHighLight={true} />
    );

    // Ensure the amount appears correctly
    expect(getByText('50')).toBeInTheDocument();

    // Ensure the title does not appear
    expect(queryByText('Hello')).not.toBeInTheDocument();

});

it('renders correctly when amount is not supplied', () => {
    const amount = 50
    const title = 'Hello'

    const { getByText, queryByText } = render(
        <AssetTypeButton title={title} onClick={true} shouldHighLight={true} />
    );

    // Ensure the amount does not appear
    expect(queryByText('50')).not.toBeInTheDocument();

    // Ensure the title appears correctly
    expect(getByText('Hello')).toBeInTheDocument();

});

it('renders correctly when all inputs are supplied', () => {
    const amount = 50
    const title = 'Hello'

    const { getByText } = render(
        <AssetTypeButton amount={amount} title={title} onClick={true} shouldHighLight={true} />
    );

    // Ensure the amount appears correctly
    expect(getByText('50')).toBeInTheDocument();

    // Ensure the title appears correctly
    expect(getByText('Hello')).toBeInTheDocument();

});
