import {Win} from '../../src/components/window';
import {render, findOne} from '../utils/helpers';

describe("Window tests", function () {

    it("renders a Window", function () {
        const title = ' -- Sample Window --';

        const body = '<div>' + title + '</div>'+ '<div>' + title + '</div>';



        const win: any = render(Win);
        win.title = title;

        var instance = (findOne(Win.is) as any)
        expect(instance.title).toBe(title);

        instance.innerHTML = body
        expect(instance.innerHTML).toBe(body);


        var el=instance.addHeaderIconFontAwesome("home", (...args) => console.log(args))
        expect( (findOne(".fa-home") as any)).toBeDefined();

    });

});