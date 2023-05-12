import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import RankBar from '../RankBar';
import profileImage from '.../assets/profiles/boy1.png';

it('renders correctly when the name is not provided', () => {

    const rankValue = 4
    const name = 'Amy'
    const xpValue = 1000
    const assetValue = 500
    const hours = 30

    const { getByText, queryByRole, queryByText } = render(
        <RankBar rankValue={rankValue} profileImage={profileImage} xpValue={xpValue} assetValue={assetValue} hours={hours} />
    );

    // Ensure the rankValue appears correctly
    expect(getByText('4')).toBeInTheDocument();

    // Ensure the user name does not appears
    expect(queryByText('Amy')).not.toBeInTheDocument();

    // Ensure the user asset appears correctly
    expect(getByText('500')).toBeInTheDocument();

    // Ensure the hour appears correctly.
    expect(getByText('30')).toBeInTheDocument();

    // Check that there is an image
    const image = queryByRole('img');
    expect(image).toBeDefined();
});

it('renders correctly when the profile image is not provided', () => {

    const rankValue = 4
    const name = 'Amy'
    const xpValue = 1000
    const assetValue = 500
    const hours = 30

    const { getByText, queryByRole } = render(
        <RankBar rankValue={rankValue} name={name} xpValue={xpValue} assetValue={assetValue} hours={hours} />
    );

    // Ensure the rankValue appears correctly
    expect(getByText('4')).toBeInTheDocument();

    // Ensure the user name appears correctly
    expect(getByText('Amy')).toBeInTheDocument();

    // Ensure the user asset appears correctly
    expect(getByText('500')).toBeInTheDocument();

    // Ensure the hour appears correctly.
    expect(getByText('30')).toBeInTheDocument();

    // Check that there are no images
    const image = queryByRole('img');
    expect(image).toBeNull();
});

it('renders correctly when all the inputs are provided', () => {

    const rankValue = 4
    const name = 'Amy'
    const xpValue = 1000
    const assetValue = 500
    const hours = 30

    const { getByText, queryByRole } = render(
        <RankBar rankValue={rankValue} profileImage={profileImage} name={name} xpValue={xpValue} assetValue={assetValue} hours={hours} />
    );

    // Ensure the rankValue appears correctly
    expect(getByText('4')).toBeInTheDocument();

    // Ensure the user name appears correctly
    expect(getByText('Amy')).toBeInTheDocument();

    // Ensure the user asset appears correctly
    expect(getByText('500')).toBeInTheDocument();

    // Ensure the hour appears correctly.
    expect(getByText('30')).toBeInTheDocument();

    // Check that there is an image
    const image = queryByRole('img');
    expect(image).toBeDefined();
});
