ex-panda
========

An Expanding List that uses webcomponents

Install
-------

Usage
-----

ex-panda consists of 3 tags: `<ex-panda-list>`, `<ex-panda-group>`, `<ex-panda-item>` which can be combined to make an expanding menu.

    <div style="background-color: #990099">
        <ex-panda-list id="list-root" orientation="vertical">
            <ex-panda-item name="Independent Item"><span>Stuff</span></ex-panda-item>
            <ex-panda-group name="Some irrelevant group name" bg="#555555" threshold="1">
                <ex-panda-item name="The Item Title">
                    <h4>An example table <a href="http://wikipedia.com">with a link</a></h4>
                    <div style="display:inline-block">
                        <table>
                            <thead>
                                <tr>
                                    <th colspan="2">The table header</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>The table body</td>
                                    <td>with two columns</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </ex-panda-item>
                <ex-panda-item name="Another Title"><span>Another Description</span></ex-panda-item>
            </ex-panda-group>
            <ex-panda-item name="Independent Item"><span>Stuff</span></ex-panda-item>
        </ex-panda-list>
    </div>

Will result in:

![alt text](image.png "Logo Title Text 1")
