const assert = require('assert')
const chai = require('chai')
const expect = chai.expect

describe('file to be tested', () => {

    context('Equal', () => {


        it('should strictEqual Number ', () => {

            assert.strictEqual(1, 1)
        })

        it('should DeepEqual Object', () => {
            assert.deepStrictEqual({ id: 1, name: 'khaled' }, { id: 1, name: 'khaled' })
        })

        it('chai expect', () => {
            expect({ id: 1 }).to.have.property('id')
            expect(function () { }).to.not.throw();
            expect({ a: 1 }).to.not.have.property('b');
            expect([1, 2]).to.be.an('array').that.does.not.include(3);
            // Target object deeply (but not strictly) equals `{a: 1}`
            expect({ a: 1 }).to.deep.equal({ a: 1 });
            expect({ a: 1 }).to.not.equal({ a: 1 });

            // Target array deeply (but not strictly) includes `{a: 1}`
            expect([{ a: 1 }]).to.deep.include({ a: 1 });
            expect([{ a: 1 }]).to.not.include({ a: 1 });

            // Target object deeply (but not strictly) includes `x: {a: 1}`
            expect({ x: { a: 1 } }).to.deep.include({ x: { a: 1 } });
            expect({ x: { a: 1 } }).to.not.include({ x: { a: 1 } });

            // Target array deeply (but not strictly) has member `{a: 1}`
            expect([{ a: 1 }]).to.have.deep.members([{ a: 1 }]);
            expect([{ a: 1 }]).to.not.have.members([{ a: 1 }]);

            // Target set deeply (but not strictly) has key `{a: 1}`
            expect(new Set([{ a: 1 }])).to.have.deep.keys([{ a: 1 }]);
            expect(new Set([{ a: 1 }])).to.not.have.keys([{ a: 1 }]);

            // Target object deeply (but not strictly) has property `x: {a: 1}`
            expect({ x: { a: 1 } }).to.have.deep.property('x', { a: 1 });
            expect({ x: { a: 1 } }).to.not.have.property('x', { a: 1 });

            expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]');
            expect({ a: { b: ['x', 'y'] } }).to.nested.include({ 'a.b[1]': 'y' });

            expect({ '.a': { '[b]': 'x' } }).to.have.nested.property('\\.a.\\[b\\]');
            expect({ '.a': { '[b]': 'x' } }).to.nested.include({ '\\.a.\\[b\\]': 'x' });
        })


    })

})