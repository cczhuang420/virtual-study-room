import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import FriendRequestItem from '../FriendRequestItem';

it('renders correctly when the user name is not supplied', () => {

    const name = 'David'

    const { queryByText } = render(
        <FriendRequestItem onAcceptClick={true} onRejectClick={true} />
    );

    // Ensure the user name does not appear
    expect(queryByText('David')).not.toBeInTheDocument();

});

it('renders correctly when all inputs are supplied', () => {

    const name = 'David'

    const { getByText } = render(
        <FriendRequestItem name={name} onAcceptClick={true} onRejectClick={true} />
    );

    // Ensure the user name appears correctly
    expect(getByText('David')).toBeInTheDocument();

});
