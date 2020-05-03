ex-panda
========

![logo](panda.png "ex-panda logo")

An Expanding List that uses webcomponents

Install
-------

    npm install ex-panda

Usage
-----

ex-panda consists of 3 tags: `<ex-panda-list>`, `<ex-panda-group>`, `<ex-panda-item>` which can be combined to make an expanding menu.

```html
    <div style="background-color: #990099">
        <ex-panda-list
            id="list-root"
            orientation="vertical"
        >
            <ex-panda-item name="Independent Item">
                <span>Stuff</span>
            </ex-panda-item>
            <ex-panda-group
                name="Some irrelevant group name"
                bg="#555555"
                threshold="1"
            >
                <ex-panda-item name="The Item Title">
                    <!-- Some HTML Tags -->
                </ex-panda-item>
                <ex-panda-item name="Another Title">
                    <span>Another Description</span>
                </ex-panda-item>
            </ex-panda-group>
            <ex-panda-item name="Independent Item">
                <span>Stuff</span>
            </ex-panda-item>
        </ex-panda-list>
    </div>
```

Will result in:

![list ui](image.png "Resulting UI")
