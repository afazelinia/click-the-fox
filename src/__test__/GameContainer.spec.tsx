import React from 'react';
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import GameContainer from "../components/GameContainer";
import * as preLoadImages from "../utils/preLoadImage";

describe('Gameplay test', () => {
    test('fill name, click start, click one image, check score and timer', async () => {
        const mockData = {
            message: "https://images.dog.ceo/breeds/chow/n02112137_11261.jpg",
            file: "https://purr.objects-us-east-1.dream.io/i/3abec.jpg",
            image: "https://randomfox.ca/images/51.jpg"
        };
        const mockResponse = {
            json: jest.fn().mockResolvedValue(mockData)
        };

        global.fetch = jest.fn().mockResolvedValue(mockResponse);
        jest.spyOn(preLoadImages, 'default').mockReturnValue(Promise.resolve());
        jest.useFakeTimers();

        render(<GameContainer />);

        // check page loaded
        expect(screen.getByText(/name/i)).toBeInTheDocument();

        // type name of user
        const inputFiled = screen.getByLabelText(/name:/i);
        act(() => {
            user.type(inputFiled, "testerAgent{enter}");
        });
        const greetingText = await screen.findByText(/Hello testerAgent/i);
        expect(greetingText).toBeInTheDocument();


        // click start
        const startButton = await screen.findByText(/Play/i);
        expect(startButton).toBeInTheDocument();
        expect(startButton).toBeEnabled();

        // check images exist
        act(() => {
            user.click(startButton);
        });
        const images = await screen.findAllByRole('img') as HTMLImageElement[];
        expect(images[0].src === mockData.message ||
            images[0].src === mockData.file ||
            images[0].src === mockData.image).toBe(true);


        // click first image and check for score change
        expect(screen.queryByText(/Score: 0/)).toBeInTheDocument();
        const divImage = await screen.findByTestId("card-0");
        act(() => {
            user.click(divImage);
        })
        expect(screen.queryByText(/Score: 0/)).not.toBeInTheDocument();


        // check for timer to count down
        act(() => {
            jest.runOnlyPendingTimers();
        });
        expect(screen.queryByText(/Time Left: 00:30/)).not.toBeInTheDocument();
        jest.useRealTimers();

    })
});
