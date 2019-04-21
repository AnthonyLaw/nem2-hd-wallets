/**
 * Copyright 2019 Grégory Saive for NEM Foundation
 *
 * Licensed under the BSD 2-Clause License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://opensource.org/licenses/BSD-2-Clause
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as bip32 from 'bip32';
import { BIP32 } from 'bip32';

import {
    NodeInterface,
    NodeEd25519,
} from '../index';

/**
 * Class `NodeImpl` is a variadic template class with
 * type `T` being the ellyptic curve implementation for BIP32.
 *
 * @example Use default BIP32 derivation and secp256k1 keys
 * ```typescript
 *     const hdNode = new NodeImpl<BIP32>(bip32.fromSeed('...'));
 * ```
 *
 * @example Use CATAPULT derivation and ed25519 keys
 * ```typescript
 *     const hdNode = new NodeImpl<NodeEd25519>(NodeEd25519.fromSeed('...'));
 * ```
 *
 * @see https://github.com/nemtech/NIP/issues/12
 * @since 0.2.0
 */
export class NodeImpl<T extends NodeInterface | BIP32> {
    /**
     * Construct a `NodeImpl` object.
     *
     * @internal This class is used internally in `ExtendedKeyNode`.
     * @param   node    {BIP32 | NodeInterface}
     */
    public constructor(/**
                        *  
                        */
                       public readonly node: T) {

    }

    /**
     * Get whether deterministic node is a Bitcoin
     * BIP32 extended key node.
     *
     * When this method returns true, the `node.network.curve`
     * field will hold `CurveAlgorithm.secp256k1`.
     *
     * @return  {boolean}
     */
    public isBitcoin(): boolean {
        return this.node instanceof BIP32;
    }

    /**
     * Get whether deterministic node is a Catapult
     * BIP32 extended key node.
     *
     * When this method returns true, the `node.network.curve`
     * field will hold `CurveAlgorithm.ed25519`.
     *
     * @return  {boolean}
     */
    public isCatapult(): boolean {
        return this.node instanceof NodeEd25519;
    }
}
